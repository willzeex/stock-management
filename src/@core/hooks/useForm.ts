import { useState } from "react";

export const useForm = <T,>(callback: () => Promise<any>, initialState: T) => {
    const [values, setValues] = useState<T>(initialState);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values, [event.target.name]:
                event.target.value
        });
    };

    // onSubmit
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await callback(); // triggering the callback
    };

    return {
        onChange,
        onSubmit,
        values,
    };
}