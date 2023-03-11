import express from "express"
import YearCtrl from "./year.controller.js"

const router = express.Router()

router.route("/new").post(YearCtrl.apiPostYear)
router.route("/:id").get(YearCtrl.apiGetYear)
router.route("/:id").put(YearCtrl.apiUpdateYear)
router.route("/:id").delete(YearCtrl.apiDeleteYear)
router.route("/").get(YearCtrl.apiGetYears)


export default router