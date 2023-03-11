import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID

let years

export default class yearDao {
  static async injectDB(conn) {
    if (years) {
      return
    }
    try {
      years = await conn.db("years").collection("years")
    } catch (e) {
      console.error(`Unable to establish collection handles in DAO: ${e}`)
    }
  }

  static async addYear(year) {
    try {
      const yearDoc = {
        year: year,
      }
      console.log("adding")
      return await years.insertOne(yearDoc)
    } catch (e) {
      console.error(`Unable to post year: ${e}`)
      return { error: e }
    }
  }

  static async getYear(yearId) {
    try {
      return await years.findOne({ _id: ObjectId(yearId) })
    } catch (e) {
      console.error(`Unable to get year: ${e}`)
      return { error: e }
    }
  }

  static async UpdateYear(yearId, year) {
    try {
      const updateResponse = await years.updateOne(
        { _id: ObjectId(yearId) },
        { $set: {year: year } }
      )
      return updateResponse
    } catch (e) {
      console.error(`Unable to update year: ${e}`)
      return { error: e }
    }
  }

  static async deleteYear(yearId) {

    try {
      const deleteResponse = await years.deleteOne({
        _id: ObjectId(yearId),
      })

      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete year: ${e}`)
      return { error: e }
    }
  }

  static async getYears() {
    try {
      const cursor = await years.find()
      return cursor.toArray()
    } catch (e) {
      console.error(`Unable to get year: ${e}`)
      return { error: e }
    }
  }

}