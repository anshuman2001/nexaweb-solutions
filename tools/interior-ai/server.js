require('dotenv').config();
const express = require('express');
const multer = require('multer');
const Replicate = require('replicate');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 20 * 1024 * 1024 }
});

app.use(express.static('public'));
app.use(express.json());

// Ensure uploads dir exists
if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');

app.post('/api/redesign', upload.single('image'), async (req, res) => {
  const imageFile = req.file;

  try {
    const { prompt, negative_prompt, api_key, style_preset, strength } = req.body;

    const token = api_key || process.env.REPLICATE_API_TOKEN;
    if (!token) {
      return res.status(400).json({ error: 'Replicate API token is required. Add it in Settings or .env file.' });
    }

    if (!imageFile) {
      return res.status(400).json({ error: 'Please upload a room image.' });
    }

    const replicate = new Replicate({ auth: token });

    const imageBuffer = fs.readFileSync(imageFile.path);
    const base64Image = `data:${imageFile.mimetype};base64,${imageBuffer.toString('base64')}`;

    const fullPrompt = buildPrompt(prompt, style_preset);
    const fullNegative = buildNegativePrompt(negative_prompt);

    console.log('Generating design...');
    console.log('Prompt:', fullPrompt);

    const output = await replicate.run(
      'adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38',
      {
        input: {
          image: base64Image,
          prompt: fullPrompt,
          negative_prompt: fullNegative,
          num_inference_steps: 50,
          guidance_scale: 15,
          prompt_strength: parseFloat(strength) || 0.8
        }
      }
    );

    const imageUrl = Array.isArray(output) ? output[0] : output;
    console.log('Generation complete:', imageUrl);

    res.json({ success: true, imageUrl });

  } catch (err) {
    console.error('Generation error:', err.message);
    res.status(500).json({ error: err.message || 'Generation failed. Check your API key and try again.' });
  } finally {
    if (imageFile && fs.existsSync(imageFile.path)) {
      fs.unlinkSync(imageFile.path);
    }
  }
});

function buildPrompt(userPrompt, preset) {
  const presets = {
    'modern-indian': 'modern luxury Indian interior, warm beige walls, walnut wood panels, marble flooring, gypsum false ceiling with LED strip lighting, luxury chandelier, premium sofa, ',
    'contemporary': 'contemporary luxury interior, clean lines, neutral palette, premium materials, architectural lighting, ',
    'minimalist': 'minimalist luxury interior, warm whites, natural materials, hidden lighting, premium furniture, ',
    'royal-indian': 'royal Indian interior, rich warm tones, ornate details, marble, brass accents, luxury drapes, crystal chandelier, ',
    'scandinavian': 'scandinavian luxury interior, warm whites, natural wood, cozy ambient lighting, clean minimal design, '
  };

  const base = presets[preset] || presets['modern-indian'];
  return `${base}${userPrompt}, ultra realistic, 8K, architectural visualization, V-Ray quality, photorealistic render, interior photography, global illumination, real shadows, real reflections, wide angle lens, luxury premium quality`;
}

function buildNegativePrompt(extra) {
  const base = 'curved ceiling, circular ceiling, rounded corners, unrealistic proportions, cartoon, low quality, blurry, dark, gloomy, futuristic, sci-fi, changed room dimensions, moved walls, moved doors, moved windows, watermark, text, logo';
  return extra ? `${base}, ${extra}` : base;
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n✅ Interior AI Designer running at: http://localhost:${PORT}\n`);
});
