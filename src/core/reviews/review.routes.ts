import express from "express";
import authMiddleware from "../../middlewares/auth";
import reviewMiddleware from "../../middlewares/review";
import { reviewController } from "..";
import { body, param } from "express-validator";
import { validateRequest } from "../../middlewares/validate-request";

const router = express.Router({ mergeParams: true });

router.get("/", [
	reviewMiddleware.beforeGetAll,
	reviewController.getAllReviews.bind(reviewController),
]);

router.get(
	"/:id",
	param("id").isMongoId().withMessage("شناسه نظر معتبر نیست"),
	validateRequest,
	reviewController.getReviewById.bind(reviewController)
);

/************************************************************************
 *********  @description Protect all routes below to users only *********
 ************************************************************************/
router.use(authMiddleware.protect);

router.post("/", [
	reviewMiddleware.beforeCreate,
	body("rating")
		.isInt({ min: 1, max: 5 })
		.withMessage("امتیاز الزامی است"),
	body("comment").isString().withMessage("نظر الزامی است"),
	body("product")
		.isMongoId()
		.withMessage("شناسه محصول الزامی است"),
	body("user").isMongoId().withMessage("شناسه کاربر الزامی است"),
	validateRequest,
	reviewController.createReview.bind(reviewController),
]);

router.patch("/:id", [
	reviewMiddleware.beforeUpdate,
	param("id").isMongoId().withMessage("شناسه نظر معتبر نیست"),
	body("rating")
		.optional()
		.isInt({ min: 1, max: 5 })
		.withMessage("امتیاز باید بین 1 و 5 باشد"),
	body("comment")
		.optional()
		.isString()
		.withMessage("فرمت نظر معتبر نیست"),
	validateRequest,
	reviewController.updateReview.bind(reviewController),
]);

router.delete("/:id", [
	reviewMiddleware.beforeDelete,
	param("productId")
		.isMongoId()
		.withMessage("شناسه نظر معتبر نیست"),
	param("id").isMongoId().withMessage("شناسه نظر معتبر نیست"),
	validateRequest,
	reviewController.deleteReview.bind(reviewController),
]);

export { router as reviewRouter };
