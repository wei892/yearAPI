import yearDao from "../dao/yearDAO.js"

export default class YearController {
  static async apiPostYear(req, res, next) {
    try {
      const year = req.body.year
      const yearResponse = await yearDao.addYear(
        year
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiGetYear(req, res, next) {
    try {
      let id = req.params.id || {}
      let year = await yearDao.getYear(id)
      if (!year) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(year)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e})
    }
  }

  static async apiUpdateYear(req, res, next) {
    try {
      const yearId = req.params.id
      const year = req.body.year
      const yearResponse = await yearDao.UpdateYear(
        yearId,
        year
      )
      var { error } = yearResponse
      if (error) {
        res.status(400).json({ error })
      }
      if (yearResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update year",
        )
      }

      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiDeleteYear(req, res, next) {
    try {
      const yearId = req.params.id
      const yearResponse = await yearDao.deleteYear(yearId)
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

	  static async apiGetYears(req, res, next) {
    try {
      let years = await yearDao.getYears();
      if (!years) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(years)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }
}