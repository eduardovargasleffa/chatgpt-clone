const openai = require("../config/openai");
const InputPromptModel = require("../models/inputPromptModel");

module.exports = {
  async sendText(req, res) {
    const openaiAPI = openai.configuration();
    const inputModel = new InputPromptModel(req.body);
    try {
      const response = await openaiAPI.createCompletion(
        openai.textCompletion(inputModel)
      );
      return res.status(200).json({
        success: true,
        data: response.data.choices[0].text,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.response ? error.response.data : "Erro no servidor",
      });
    }
  },
};
