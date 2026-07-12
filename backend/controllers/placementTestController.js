import PlacementTest from "../models/placementTestModel.js";

// Get placement test data
export const getPlacementTest = async (req, res) => {
  try {
    const data = await PlacementTest.findOne();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create or Update placement test data
export const savePlacementTest = async (req, res) => {
  try {
    const { terms, testLink } = req.body;

    let data = await PlacementTest.findOne();

    if (data) {
      data.terms = terms;
      data.testLink = testLink;

      await data.save();
    } else {
      data = await PlacementTest.create({
        terms,
        testLink,
      });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};