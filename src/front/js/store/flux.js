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
			articles: [],
			article: null,
			favoriteArticles: []
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
				const requestOptions = {
					method: 'POST',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ firstName, lastName, email, password })
				};

				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/signup", requestOptions);

					if (response.status !== 200) {
						const errorData = await response.json();
						return { success: false, message: errorData.msg || "Error en el registro" };
					}

					const data = await response.json();
					console.log("Registro exitoso:", data.msg);
					return { success: true };

				} catch (error) {
					console.error("Error during signup:", error);
					return { success: false, message: "Error de conexión al servidor" };
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
			},

			getArticles: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/article`);
					const data = await response.json();
					if (response.ok) {
						setStore({ articles: data });
					} else {
						console.error('Error al obtener los artículos:', data);
					}
				} catch (error) {
					console.error('Error en la solicitud de obtener artículos:', error);
				}
			},

			getArticleById: async (articleId) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/article/${articleId}`);
					const data = await response.json();
					if (response.ok) {
						setStore({ article: data });
					} else {
						console.error(`Error al obtener el artículo con ID ${articleId}:`, data);
					}
				} catch (error) {
					console.error('Error en la solicitud de obtener artículo:', error);
				}
			},

			createArticle: async (articleData) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/article", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(articleData)
					});
					if (!resp.ok) {
						const errorData = await resp.json();
						throw new Error(`Error al crear el artículo: ${errorData.message || "Unknown error"}`);
					}
					const data = await resp.json();
					return true;
				} catch (error) {
					console.error(error);
					return false;
				}
			},
			
			deleteArticle: async (articleId) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/article/${articleId}`, {
						method: 'DELETE'
					});
					if (response.ok) {
						getActions().getArticles();
						console.log(`Artículo con ID ${articleId} eliminado`);
					} else {
						const data = await response.json();
						console.error(`Error al eliminar el artículo con ID ${articleId}:`, data);
					}
				} catch (error) {
					console.error('Error en la solicitud de eliminar artículo:', error);
				}
			},

			updateArticle: async (articleId, updatedArticle) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/article/${articleId}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(updatedArticle)
					});
					const data = await response.json();
					if (response.ok) {
						getActions().getArticles(); // Actualizar la lista de artículos
						console.log(`Artículo con ID ${articleId} actualizado:`, data);
					} else {
						console.error(`Error al actualizar el artículo con ID ${articleId}:`, data);
					}
				} catch (error) {
					console.error('Error en la solicitud de actualizar artículo:', error);
				}
			},

			getFavoritesArticles: async () => {
				try {
					const response = await fetch(`${BACKEND_URL}/favorites`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
						},
					});

					if (!response.ok) {
						throw new Error('Error fetching favorite articles');
					}

					const data = await response.json();
					setStore({ favoriteArticles: data });
				} catch (error) {
					console.error(error);
				}
			},

			getFavoriteArticleById: async (articleId) => {
				try {
					const response = await fetch(`${BACKEND_URL}/favorites/${articleId}`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
						},
					});

					if (!response.ok) {
						throw new Error('Error fetching favorite article');
					}

					const data = await response.json();
					return data;
				} catch (error) {
					console.error(error);
				}
			},

			addFavoriteArticle: async (articleId, userId) => {
				if (!articleId || !userId) {
				  console.error('Article ID and User ID are required.');
				  return false;
				}
			  
				try {
				  const response = await fetch(`${BACKEND_URL}/favorites`, {
					method: 'POST',
					headers: {
					  'Content-Type': 'application/json',
					},
					body: JSON.stringify({ article_id: articleId, user_id: userId }),
				  });
			  
				  if (response.ok) {
					const data = await response.json();
			  

					setStore((prevStore) => ({
					  ...prevStore,
					  favoriteArticles: [...prevStore.favoriteArticles, data],
					}));
			  
					console.log("Artículo agregado a favoritos", data); 
					return true; 
				  } else {
					
					const errorData = await response.json();
					console.error('Error al agregar artículo a favoritos:', errorData);
					return false;
				  }
				} catch (error) {
				  console.error("Error en la solicitud:", error);
				  return false;
				}
			  },
			  
			  removeFavoriteArticle: async (articleId) => {
				if (!articleId) {
				  console.error('Article ID is required.');
				  return false;
				}
			  
				try {
				  const response = await fetch(`${BACKEND_URL}/favorites/${articleId}`, {
					method: 'DELETE',
					headers: {
					  'Content-Type': 'application/json',
					},
				  });
			  
				  if (response.ok) {
	
					setStore((prevStore) => ({
					  ...prevStore,
					  favoriteArticles: prevStore.favoriteArticles.filter(article => article.article_id !== articleId)
					}));
			  
					console.log("Artículo eliminado de favoritos", articleId);
					return true; 
				  } else {
					const errorData = await response.json();
					console.error('Error al eliminar el artículo de favoritos:', errorData);
					return false;
				  }
				} catch (error) {
				  console.error("Error en la solicitud:", error);
				  return false;
				}
			},

			setid: (article) => {
				setStore({ article });
			}
		},
	};
};

export default getState;
