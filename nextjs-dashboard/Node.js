"use client";

import { useEffect } from "react";

export default function TodosPage() {
    useEffect(() => {
        const fetchTodos = async () => {
            const { data, error } = await supabase
                .from('todos')
                .select();

            if (error) {
                console.error("Error fetching todos:", error);
            } else {
                console.log("Fetched todos:", data);
            }
        };

        fetchTodos();
    }, []);

    return <div>Check console for todos!</div>;
}
