// src/components/Home.js

import React, { useState, useEffect } from "react";
import styles from "styles/Home.module.css";
import axios from "axios";
import API_URL from "constants/constants";

function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        container_id: "",
        name: "",
        formula: "",
        mass: "",
        volume: "0",
        density: "1",
        location: "0",
        precursor: false,
        cas: "0",
        qualification: "0",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [fetchError, setFetchError] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFormData({
            container_id: "",
            name: "",
            formula: "",
            mass: "",
            volume: "",
            density: "",
            location: "",
            precursor: false,
            cas: "",
            qualification: "",
        });
        setError(null);
        setSuccessMessage(null);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    useEffect(() => {
        const fetchContainerCount = async () => {
            if (isModalOpen) {
                setIsFetching(true);
                setFetchError(null);
                try {
                    const response = await axios.get(`${API_URL}data/containers/`);
                    const containers = response.data;
                    const count = containers.length;
                    setFormData((prevData) => ({
                        ...prevData,
                        container_id: count + 1, // Назначаем ID как количество + 1
                    }));
                } catch (err) {
                    console.error("Ошибка при получении контейнеров:", err);
                    setFetchError("Не удалось получить количество контейнеров. Попробуйте позже.");
                } finally {
                    setIsFetching(false);
                }
            }
        };

        fetchContainerCount();
    }, [isModalOpen, API_URL]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const response = await axios.post(`${API_URL}data/containers/`, {
                container_id: parseInt(formData.container_id, 10),
                name: formData.name,
                formula: formData.formula,
                mass: parseFloat(formData.mass),
                volume: parseFloat(formData.volume),
                density: parseFloat(formData.density),
                location: formData.location,
                precursor: formData.precursor,
                cas: formData.cas,
                qualification: parseInt(formData.qualification, 10),
            });

            console.log("Контейнер создан:", response.data);
            setSuccessMessage("Контейнер успешно создан!");
            closeModal();
        } catch (err) {
            console.error(err);
            if (err.response) {
                setError(`Ошибка: ${err.response.data.detail || err.response.statusText}`);
            } else if (err.request) {
                setError("Не удалось подключиться к серверу. Проверьте ваше интернет-соединение.");
            } else {
                setError("Произошла ошибка. Пожалуйста, попробуйте снова.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.homePage}>
            <div className={styles.newContainerSection}>
                <h3>Добавление нового контейнера</h3>
                <button className={styles.addButton} onClick={openModal}>
                    Добавить контейнер
                </button>
            </div>

            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContainer}>
                        <h2>Новый контейнер</h2>
                        <form className={styles.modalForm} onSubmit={handleSubmit}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="name">Наименование *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    minLength="1"
                                    maxLength="100"
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="formula">Формула *</label>
                                <input
                                    type="text"
                                    id="formula"
                                    name="formula"
                                    value={formData.formula}
                                    onChange={handleChange}
                                    required
                                    minLength="1"
                                    maxLength="100"
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="mass">Масса *</label>
                                <input
                                    type="number"
                                    id="mass"
                                    name="mass"
                                    value={formData.mass}
                                    onChange={handleChange}
                                    required
                                    step="any"
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="density">Плотность</label>
                                <input
                                    type="number"
                                    id="density"
                                    name="density"
                                    value={formData.density}
                                    onChange={handleChange}
                                    step="any"
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="location">Местоположение</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    minLength="1"
                                    maxLength="100"
                                />
                            </div>
                            <div className={styles.inputGroupCheckbox}>
                                <label htmlFor="precursor">Прекурсор *</label>
                                <input
                                    type="checkbox"
                                    id="precursor"
                                    name="precursor"
                                    checked={formData.precursor}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="cas">CAS</label>
                                <input
                                    type="text"
                                    id="cas"
                                    name="cas"
                                    value={formData.cas}
                                    onChange={handleChange}
                                    minLength="1"
                                    maxLength="100"
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="qualification">Квалификация, %</label>
                                <input
                                    type="number"
                                    id="qualification"
                                    name="qualification"
                                    value={formData.qualification}
                                    onChange={handleChange}
                                    min="-2147483648"
                                    max="2147483647"
                                />
                            </div>
                            {error && <p className={styles.errorMessage}>{error}</p>}
                            <div className={styles.buttonGroup}>
                                <button type="button" className={styles.cancelButton} onClick={closeModal}>
                                    Отмена
                                </button>
                                <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                                    {isSubmitting ? "Создание..." : "Создать"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
        </div>
    );
}

export default Home;
