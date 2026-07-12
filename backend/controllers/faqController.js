import FAQ from "../models/faqModel.js";

//get all faqs

export const getFAQs = async (req,res) => {
    try{
        const faqs = await FAQ.find();
        res.json(faqs);
    }catch(error){
        res.status(500).json({message: err.message});
    }
};

//create faq

export const createFAQ = async(req,res) => {
    try{
        const faq = await FAQ.create(req.body);
        res.status(201).json(faq);
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

//update faq
export const updateFAQ = async(req,res) => {
    try{
        const faq = await FAQ.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        res.json(faq);
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

//delete faq
export const deleteFAQ = async(req,res) => {
    try{
        await FAQ.findByIdAndDelete(req.params.id);

        res.json({message: "FAQ deleted successfully!"});

    }catch(error){
        res.status(500).json({message: error.message});
    }
};
