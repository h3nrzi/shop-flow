// @ts-nocheck

export const deleteProduct = async id => {
	try {
		const res = await axios.delete(`/api/products/${id}`);
		if (res.status === 204) window.location.reload();
	} catch (err) {
		alert(err.response?.data?.errors[0].message);
	}
};

export const createProduct = async data => {
	try {
		const res = await axios.post("/api/products", data, {
			withCredentials: true,
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (res.data.status === "success")
			window.location.href = "/admin";
	} catch (err) {
		alert(err.response?.data?.errors[0].message);
	}
};

export const editProduct = async (data, productId) => {
	try {
		const res = await axios.patch(
			`/api/products/${productId}`,
			data,
			{
				withCredentials: true,
				headers: { "Content-Type": "application/json" },
			},
		);

		if (res.data.status === "success")
			window.location.href = "/admin";
	} catch (err) {
		alert(
			err.response?.data?.message ||
				err.message ||
				"An error occurred",
		);
	}
};

export const login = async data => {
	try {
		const res = await axios.post("/api/users/login", data, {
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
		});

		if (res.data.status === "success")
			window.location.href = "/admin";
	} catch (err) {
		alert(err.response?.data?.errors[0].message);
	}
};

export const logout = async () => {
	try {
		const res = await axios.post(
			"/api/users/logout",
			{},
			{ withCredentials: true },
		);
		if (res.status === 204) window.location.reload();
	} catch (err) {
		alert(err.response?.data?.errors[0].message);
	}
};

export const uploadImage = formData => {
	return axios.post("/api/uploads", formData, {
		headers: { "Content-Type": "multipart/form-data" },
		withCredentials: true,
	});
};
