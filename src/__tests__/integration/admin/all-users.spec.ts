import {
	allUsersRequest,
	createProductRequest,
} from "@/__tests__/helpers/admin.helper";
import {
	getInvalidToken,
	getUniqueUser,
	signupRequest,
} from "@/__tests__/helpers/auth.helper";
import { validProduct } from "@/__tests__/helpers/products.helper";
import { userRepository } from "@/core";

// let userCookie: string;
let adminCookie: string;

beforeEach(async () => {
	// User cookie building
	// const user = getUniqueUser("user");
	// const res = await signupRequest(user);
	// userCookie = res.headers["set-cookie"][0];

	// Admin cookie building
	const admin = getUniqueUser("admin");
	const adminRes = await signupRequest(admin);
	adminCookie = adminRes.headers["set-cookie"][0];
	const adminUser = await userRepository.findByEmail(
		admin.email
	);
	adminUser!.role = "admin";
	await adminUser!.save({ validateBeforeSave: false });
});

describe("GET /api/users", () => {
	describe("should return 401", () => {
		it("If no token is provided", async () => {
			const res = await allUsersRequest("");
			expect(res.status).toBe(401);
			expect(res.body.errors[0].field).toBeNull();
			expect(res.body.errors[0].message).toBe(
				"شما وارد نشده اید! لطفا برای دسترسی وارد شوید"
			);
		});

		it("If token is invalid", async () => {
			const res = await allUsersRequest("jwt=invalid-token");
			expect(res.status).toBe(401);
			expect(res.body.errors[0].field).toBeNull();
			expect(res.body.errors[0].message).toBe("توکن معتبر نیست");
		});

		it("If user for token does not exist", async () => {
			const fakeToken = getInvalidToken();
			const res = await allUsersRequest(`jwt=${fakeToken}`);
			expect(res.status).toBe(401);
			expect(res.body.errors[0].field).toBeNull();
			expect(res.body.errors[0].message).toBe(
				"کاربر متعلق به این توکن دیگر وجود ندارد!"
			);
		});

		it("If user is inactive", async () => {
			const user = getUniqueUser("inactive");
			const signupRes = await signupRequest(user);
			const cookie = signupRes.headers["set-cookie"][0];
			const repoUser = await userRepository.findByEmail(
				user.email
			);
			repoUser!.active = false;
			await repoUser!.save({ validateBeforeSave: false });
			const res = await allUsersRequest(cookie);
			expect(res.status).toBe(401);
			expect(res.body.errors[0].field).toBeNull();
			expect(res.body.errors[0].message).toBe(
				"کاربری که به این ایمیل مرتبط است غیرفعال شده!"
			);
		});

		// 	it("If user changed password after token was issued", async () => {
		// 		await updateMePasswordRequest(userCookie, {
		// 			passwordCurrent: "test123456",
		// 			password: "newpassword123",
		// 			passwordConfirmation: "newpassword123",
		// 		});

		// 		await new Promise(resolve => setTimeout(resolve, 500));

		// 		const res = await allUsersRequest(userCookie);

		// 		expect(res.status).toBe(401);
		// 		expect(res.body.errors[0].field).toBeNull();
		// 		expect(res.body.errors[0].message).toBe(
		// 			"کاربر اخیرا رمز عبور را تغییر داده است! لطفا دوباره وارد شوید."
		// 		);
		// 	});

		// 	it("If user's role is not admin", async () => {
		// 		const res = await allUsersRequest(userCookie);
		// 		expect(res.status).toBe(401);
		// 	expect(res.body.errors[0].field).toBeNull();
		// 	expect(res.body.errors[0].message).toBe(
		// 		"شما اجازه انجام این عمل را ندارید!"
		// 	);
		// });
	});

	describe("should return 200", () => {
		it("If user is admin", async () => {
			for (let i = 0; i < 2; i++) {
				await createProductRequest(adminCookie, validProduct);
			}
			const res = await allUsersRequest(adminCookie);
			expect(res.status).toBe(200);
			expect(res.body.results).toBe(2);
			expect(res.body.data.users).toBeDefined();
		});
	});
});
