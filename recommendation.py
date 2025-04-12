from transformers import T5Tokenizer, T5ForConditionalGeneration, Trainer, TrainingArguments
from datasets import Dataset
import pandas as pd
import Processing  # assuming this has your make_dictionary and format_input functions

# === Load and preprocess data ===
data = pd.read_csv(r"exercise data.csv")

# Drop rows with missing inputs or recommendations
data = data.dropna(subset=["Recommendation"])

# Format input string from multiple columns
data["input"] = data.apply(Processing.format_input, axis=1)

# Rename recommendation column to output
data = data.rename(columns={'Recommendation': 'output'})

# Keep only necessary columns
data = data[["input", "output"]]

# Convert to Hugging Face Dataset
dataset = Dataset.from_pandas(data)

# === Tokenization ===
tokenizer = T5Tokenizer.from_pretrained('t5-small')
model = T5ForConditionalGeneration.from_pretrained('t5-small')


def preprocess(example):
    inputs = tokenizer("recommendation: " + example['input'], padding='max_length', truncation=True, max_length=128)
    labels = tokenizer(example['output'], padding='max_length', truncation=True, max_length=128)
    inputs["labels"] = labels["input_ids"]
    return inputs


# Tokenize dataset
tokenized_dataset = dataset.map(preprocess)

# Drop original columns to avoid Trainer errors
tokenized_dataset = tokenized_dataset.remove_columns(["input", "output"])


# Split into training and evaluation sets
split_dataset = tokenized_dataset.train_test_split(test_size=0.1)
train_dataset = split_dataset["train"]
eval_dataset = split_dataset["test"]

# === Training configuration ===
training_args = TrainingArguments(
    output_dir="./results",
    per_device_train_batch_size=4,
    num_train_epochs=3,
    save_strategy="epoch",
    logging_dir='./logs',
    logging_steps=10
)

# === Trainer setup ===
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=eval_dataset,
)

# === Train the model ===
trainer.train()
