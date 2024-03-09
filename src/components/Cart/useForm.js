import { useState } from "react";

const useForm = (submitCallback) => {
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        correo: "",
        celular: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formValues = Object.values(formData);
        if (formValues.includes('')) {
            alert('Por favor completa todos los campos del formulario.');
            return;
        }

        submitCallback(formData);
    };

    return {
        formData,
        setFormData,
        handleSubmit
    };
};

export default useForm;
