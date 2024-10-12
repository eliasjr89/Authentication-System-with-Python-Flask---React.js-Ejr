import { Navigate } from "react-router-dom";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			categories: [],
			authors: [],
			articles: [],
			temp: [],
			auth: false,
			newspapers: [],
		},
		actions: {
			login: async (email, password) => {
				const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: email,
					password: password,
				}),
				};

				try {
				const response = await fetch(
					process.env.BACKEND_URL + "/api/login",
					requestOptions
				);

				if (response.status !== 200) {
					const errorData = await response.json();
					return {
					success: false,
					message: errorData.msg || "Credenciales incorrectas",
					};
				}
				const data = await response.json();
				localStorage.setItem("token", data.access_token);
				setStore({ auth: true });

				return { success: true };
				} catch (error) {
				console.error("Error during login:", error);
				return { success: false, message: "Error de conexión al servidor" };
				}
			},

			logout: () => {
				setStore({ auth: false });
				localStorage.removeItem("token");
			},
				
			signup: async (firstName, lastName, email, password) => {
				const userData = {
					first_name: firstName,
					last_name: lastName,
					email: email,
					password: password
				};
			
				try {
					const response = await fetch(`${BACKEND_URL}/signup`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(userData),
					});
			
					const result = await response.json();
					return result;
				} catch (error) {
					console.error('Error en el registro:', error);
					return { success: false, message: 'Error en el registro' };
				}
			},
			

			verifyToken: async () => {
				const token = localStorage.getItem("token");

				if (!token) {
				setStore({ auth: false });
				return false;
				}

				const requestOptions = {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				};

				try {
				const response = await fetch(
					process.env.BACKEND_URL + "/api/paginaprivada",
					requestOptions
				);

				if (response.status === 200) {
					setStore({ auth: true });
					return true;
				} else {
					localStorage.removeItem("token");
					setStore({ auth: false });
					return false;
				}
				} catch (error) {
				console.error("Error verifying token:", error);
				setStore({ auth: false });
				return false;
				}
			},

			// CATEGORIES

			loadCategories: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/category`);
					if (!response.ok) throw new Error("Failed to load categories");
					const data = await response.json();
					setStore({ categories: data });
				} catch (error) {
					console.error("Error loading categories:", error);
				}
			},

			newCategory: async (category) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/category`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(category),
					});
					if (!response.ok) {
						const errorData = await response.json();
						throw new Error(`Error ${response.status}: ${errorData.message || "Unknown error"}`);
					}
					await getActions().loadCategories();
				} catch (error) {
					console.error("Error saving category:", error);
				}
			},

			updateCategory: async (id, updatedData) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/category/${id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(updatedData),
					});
					if (!response.ok) {
						const errorData = await response.json();
						throw new Error(`Error ${response.status}: ${errorData.message || "Unknown error"}`);
					}
					await getActions().loadCategories();
				} catch (error) {
					console.error("Error updating category:", error);
				}
			},

			deleteCategory: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/category/${id}`, {
						method: "DELETE",
					});
					if (!response.ok) throw new Error("Failed to delete category");

					await getActions().loadCategories();
				} catch (error) {
					console.error("Failed to delete category:", error);
				}
			},
			
			getUserCategories: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/user-category`);
					if (!response.ok) throw new Error("Failed to load user categories");
			
					const data = await response.json();
					setStore({ userCategories: data }); 
				} catch (error) {
					console.error("Error loading user categories:", error);
				}
			},
			
			// AUTHORS

			loadAuthors: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/author`);
					if (!response.ok) throw new Error("Failed to load authors");
					const data = await response.json();
					setStore({ authors: data });
				} catch (error) {
					console.error("Error loading authors:", error);
				}
			},
			
			newAuthor: async (author) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/author`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(author),
					});
					if (!response.ok) {
						const errorData = await response.json();
						throw new Error(`Error ${response.status}: ${errorData.message || "Unknown error"}`);
					}
					await getActions().loadAuthors();
				} catch (error) {
					console.error("Error saving author:", error);
				}
			},
			
			updateAuthor: async (id, updatedData) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/author/${id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(updatedData),
					});
					if (!response.ok) {
						const errorData = await response.json();
						throw new Error(`Error ${response.status}: ${errorData.message || "Unknown error"}`);
					}
					await getActions().loadAuthors();
				} catch (error) {
					console.error("Error updating author:", error);
				}
			},
			
			deleteAuthor: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/author/${id}`, {
						method: "DELETE",
					});
					if (!response.ok) throw new Error("Failed to delete author");
			
					await getActions().loadAuthors();
				} catch (error) {
					console.error("Failed to delete author:", error);
				}
			},	
			
			getUserAuthors: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/user-author`);
					if (!response.ok) throw new Error("Failed to load user authors");
			
					const data = await response.json();
					setStore({ userAuthors: data }); 
				} catch (error) {
					console.error("Error loading user authors:", error);
				}
			},

			// NEWSPAPER

			getNewspapers: async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/newspaper`);
                    if (!response.ok) throw new Error('Error fetching newspapers');
                    const data = await response.json();
                    setStore({ newspapers: data });
                } catch (error) {
                    console.error("Error loading newspapers: ", error);
                }
            },

			createNewspaper: async (newspaper) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/newspaper`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newspaper)
                    });
                    if (!response.ok) throw new Error('Error creating newspaper');
                    await getActions().getNewspapers();
                } catch (error) {
                    console.error("Error creating newspaper: ", error);
                }
            },

            updateNewspaper: async (id, updatedData) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/newspaper/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updatedData)
                    });
                    if (!response.ok) throw new Error('Error updating newspaper');
                    await getActions().getNewspapers();
                } catch (error) {
                    console.error("Error updating newspaper: ", error);
                }
            },

            deleteNewspaper: async (id) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/newspaper/${id}`, {
                        method: 'DELETE'
                    });
                    if (!response.ok) throw new Error('Error deleting newspaper');
                    await getActions().getNewspapers();
                } catch (error) {
                    console.error("Error deleting newspaper: ", error);
                }
            }
		},
	};
};

export default getState;
