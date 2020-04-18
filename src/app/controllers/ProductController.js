class ProductController {
    async list(req, res) {
        return res.json({ deu: 'bom' });
    }
}

export default new ProductController();
