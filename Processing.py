import re


def make_dictionary(text):
    pattern = r'([\w\s-]+):\s*\(([^)]*)\)'

    matches = re.findall(pattern, text)

    result = {}

    for category, items in matches:
        category = category.strip()
        raw_items = items.split(',')

        cleaned_items = []
        for item in raw_items:
            item = item.strip()

            item = re.sub(r'^and\s+', '', item)

            if ' and ' in item:
                sub_items = [sub.strip() for sub in item.split(' and ')]
                cleaned_items.extend(sub_items)
            else:
                cleaned_items.append(item)

        result[category] = cleaned_items
    return result
