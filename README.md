# PharmGenomics Health Analyzer

## Overview
PharmGenomics Health Analyzer is an advanced pharmacogenomics analysis platform that interprets genetic variants from VCF (Variant Call Format) files to predict drug interactions, metabolic phenotypes, and personalized health risks. By leveraging AI-powered explanations and CPIC-aligned recommendations, this tool empowers healthcare professionals and patients with actionable insights for precision medicine.

---

## 🌐 Deployment
- **Live Application**: https://health-frontent-4ede.vercel.app
- **Backend Repository**: https://github.com/abudardarajiya-eng/Health-Backend
- **Video Demo**: [Add LinkedIn video URL here]

---

## 🏗️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      Frontend (React + Vite)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │  FileUpload  │  │  DrugInput   │  │  ResultsDisplay      │  │
│  │  Component   │  │  Component   │  │  & Visualization     │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
│           │               │                    ▲                 │
└───────────┼───────────────┼────────────────────┼─────────────────┘
            │               │                    │
            │               │                    │
            ▼               ▼                    │
      ┌─────────────────────────────┐            │
      │  API Service (axios)        │            │
      │  POST /analyze/summarize    │            │
      └─────────────────────────────┘            │
            │                                    │
            ▼                                    │
┌─────────────────────────────────────────────┐ │
│        Backend (Express.js + Node.js)       │ │
│  ┌──────────────────────────────────────┐   │ │
│  │  Analysis Controller                 │   │ │
│  └──────────────────────────────────────┘   │ │
│           │                                  │ │
│  ┌────────┴────────┬──────────┬────────────┐│ │
│  ▼                 ▼          ▼            ▼│ │
│ VCF Parser    Star Allele   Phenotype   Drug Rule │
│ Service       Engine        Mapper      Engine    │
│  │                 │          │            │      │
│  └─────────────────┼──────────┼────────────┘      │
│                    │          │                   │
│           ┌────────┴──────────┴──────┐            │
│           ▼                          ▼            │
│      Gene Database          Risk Engine           │
│    (CYP2C19, CYP2D6,       (Clinical          │
│     CYP2C9, DPYD, etc)      Assessment)      │
│                                                  │
│  ┌────────────────────────────────────────┐    │
│  │  Gemini AI Service                     │    │
│  │  (Explanation Generation via Google)   │    │
│  └────────────────────────────────────────┘    │
└─────────────────────────────┬───────────────────┘
                              │
                              ▼
                    [Response + JSON Output]
```

---

## 📋 Installation Instructions

### Prerequisites
- **Node.js** >= 16.0.0
- **npm** >= 8.0.0
- **Google Gemini API Key** (for AI explanations)
- **Git**

### Backend Setup

```bash
# 1. Navigate to backend directory
cd Health-Backend

# 2. Install dependencies
npm install

# 3. Create .env file in Health-Backend root
echo "GEMINI_API_KEY=your_api_key_here" > .env
echo "PORT=5000" >> .env
echo "NODE_ENV=development" >> .env

# 4. Verify the VCF test file is present
ls test.vcf

# 5. Start development server
npm run dev
# Server will run on http://localhost:5000
```

### Frontend Setup

```bash
# 1. Navigate to frontend directory
cd Health-frontend

# 2. Install dependencies
npm install

# 3. Create .env file (if needed for API endpoint)
echo "VITE_API_URL=http://localhost:5000" > .env

# 4. Start development server
npm run dev
# Frontend will run on http://localhost:5173

# 5. For production build
npm run build
npm run preview
```

---

## 🔧 Environment Setup

### Backend Environment Variables (.env)

```env
# Google Gemini API Configuration
GEMINI_API_KEY=your_google_generative_ai_api_key

# Server Configuration
PORT=5000
NODE_ENV=development

# Optional: Database (if MongoDB integration is needed)
# MONGODB_URI=mongodb://localhost:27017/health-analyzer
```

### Frontend Environment Variables (.env)

```env
# API Backend URL
VITE_API_URL=http://localhost:5000
```

### Getting Your Gemini API Key
1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Click "Get API Key"
3. Create a new API key for your project
4. Copy and paste into `.env` file

---

## 💡 Usage Examples

### 1. Upload VCF File and Analyze

**Request:**
```bash
curl -X POST http://localhost:5000/analyze/summarize \
  -F "file=@sample.vcf" \
  -F "drugs=[]"
```

**Response:**
```json
{
  "variantSummary": [
    {
      "gene": "CYP2D6",
      "star": "*1/*4",
      "rsid": "rs3892097"
    }
  ],
  "phenotypes": {
    "CYP2D6": "Intermediate Metabolizer"
  },
  "drugAnalysis": [
    {
      "drug": "Codeine",
      "risk": "CAUTION",
      "phenotype": "Intermediate Metabolizer",
      "explanation": "..."
    }
  ]
}
```

### 2. Frontend File Upload Flow

1. Navigate to the application
2. Click "Upload VCF File" button
3. Select a `.vcf` file from your computer
4. (Optional) Enter drug names for targeted analysis
5. View results with risk badges and AI-generated explanations

### 3. Multi-Drug Analysis

```bash
curl -X POST http://localhost:5000/analyze/summarize \
  -F "file=@sample.vcf" \
  -F "drugs=[\"Warfarin\", \"Clopidogrel\", \"Simvastatin\"]"
```

### 4. VCF File Format Example

```vcf
##fileformat=VCFv4.2
#CHROM	POS	ID	REF	ALT	QUAL	FILTER	INFO
chr10	94942869	rs1065852	C	T	.	PASS	GENE=CYP2C19;STAR=*2
chr22	42128875	rs3892097	A	G	.	PASS	GENE=CYP2D6;STAR=*4
```

---

## 🧬 Supported Gene Variants & Phenotypes

### Analyzed Genes
- **CYP2C19** - Global healthcare, antiplatelet therapy, antidepressants
- **CYP2C9** - Warfarin metabolism, NSAIDs
- **CYP2D6** - Codeine, antipsychotics, antidepressants
- **DPYD** - 5-Fluorouracil (chemotherapy) metabolism
- **SLCO1B1** - Statin metabolism (e.g., simvastatin)
- **TPMT** - Thiopurine drug metabolism

### Phenotype Classifications
- **Ultrarapid Metabolizer (UM)**: Very fast drug clearance
- **Rapid Metabolizer (RM)**: Fast drug clearance
- **Normal Metabolizer (NM)**: Standard metabolism
- **Intermediate Metabolizer (IM)**: Slower metabolism
- **Poor Metabolizer (PM)**: Very slow/impaired metabolism

### Risk Levels
- 🟢 **GREEN** - Standard dosing recommended
- 🟡 **YELLOW** - Caution required, possible dose adjustment
- 🔴 **RED** - Avoid or use alternative with caution

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.3.1
- **Styling**: Tailwind CSS 4.2.0
- **Icons**: Lucide React 0.575.0
- **File Upload**: react-dropzone 15.0.0
- **HTTP Client**: axios 1.13.5

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 5.2.1
- **Middleware**: CORS 2.8.6, Multer 2.0.2
- **Environment**: dotenv 17.3.1
- **AI Integration**: Google Generative AI 0.5.0
- **Database**: Mongoose 9.2.1 (optional)
- **Dev Tool**: Nodemon 3.1.0

### Data & Algorithms
- **VCF File Parsing**: Custom VCF parser
- **Star Allele Mapping**: CPIC-aligned star allele engine
- **Phenotype Prediction**: Evidence-based phenotype mapper
- **Drug-Gene Interaction**: Evidence-based drug rule engine
- **AI Explanations**: Google Gemini 2.0 Flash model

---

## 📊 Known Limitations

1. **VCF File Size**: Currently handles VCF files up to 50MB. Larger files may require streaming implementation.

2. **Gene Coverage**: Limited to 6 major pharmacogenes. Rare variants may not have star allele mappings.

3. **Drug Database**: Drug ruleset focuses on CPIC-recommended genes. Off-label or rare drug interactions may have limited analysis.

4. **Gemini API Dependency**: Explanations require active internet connection and valid API quota. Fallback explanations are limited.

5. **No Medical Authorization**: This tool provides educational analysis and should not replace professional medical advice. All findings should be reviewed by qualified healthcare providers.

6. **Data Privacy**: Uploaded VCF files are processed and may be temporarily stored. Consider HIPAA/GDPR compliance for production deployments.

7. **Database Integration**: Currently stateless. No persistent storage of analysis history without database setup.

8. **Variant Interpretation**: Only handles common SNPs and insertions/deletions (indels). Complex structural variants are not supported.

9. **Haplotype Phasing**: Does not infer haplotype phasing from genotypes. Pre-phased data is assumed.

10. **Population Specificity**: Default allele frequencies based on global populations; ethnic-specific considerations may require customization.

---

## 👥 Team Members

- **[Member Name 1]** - Full Stack Development
- **[Member Name 2]** - Backend & AI Integration
- **[Member Name 3]** - Frontend Development
- **[Member Name 4]** - Data Science & Gene Database
- **[Member Name 5]** - Project Management

---

## 📄 License
This project is licensed under the ISC License - see the LICENSE file for details.

## 🤝 Contributing
Contributions are welcome! Please fork the repository and submit pull requests for any improvements.

## 📧 Support
For issues, questions, or suggestions, please open an issue on GitHub or contact the development team.

---

**Last Updated**: February 2026  
**Status**: Active Development 🚀
