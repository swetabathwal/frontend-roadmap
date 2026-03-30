#!/bin/bash
# ============================================================
# Sweta's Frontend Roadmap — Push to GitHub
# Run: bash push-to-github.sh YOUR_GITHUB_TOKEN
# ============================================================

TOKEN=$1

if [ -z "$TOKEN" ]; then
  echo "Usage: bash push-to-github.sh <your_github_personal_access_token>"
  echo ""
  echo "How to get a token:"
  echo "  1. Go to https://github.com/settings/tokens/new"
  echo "  2. Note: 'Frontend Roadmap Deploy'"
  echo "  3. Check 'repo' scope"
  echo "  4. Click Generate token, copy it"
  exit 1
fi

USERNAME="swetabathwal"
REPO="frontend-dev-roadmap"

echo "Creating GitHub repository: $USERNAME/$REPO ..."
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
  -H "Authorization: token $TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/user/repos \
  -d "{
    \"name\": \"$REPO\",
    \"description\": \"Interactive Frontend Developer Roadmap — Junior to Staff level study platform with progress tracking, notes, and daily planner\",
    \"private\": false,
    \"auto_init\": false,
    \"topics\": [\"react\", \"frontend\", \"roadmap\", \"interview-prep\", \"angular\", \"typescript\", \"accessibility\"]
  }")

HTTP_CODE=$(echo "$RESPONSE" | tail -1)

if [ "$HTTP_CODE" = "201" ]; then
  echo "✅ Repository created: https://github.com/$USERNAME/$REPO"
elif [ "$HTTP_CODE" = "422" ]; then
  echo "ℹ️  Repository already exists, pushing to it..."
else
  echo "Response code: $HTTP_CODE"
  echo "$RESPONSE" | head -1
fi

echo ""
echo "Pushing code..."
git remote remove origin 2>/dev/null || true
git remote add origin "https://$TOKEN@github.com/$USERNAME/$REPO.git"
git push -u origin main

echo ""
echo "✅ Done! Visit: https://github.com/$USERNAME/$REPO"
echo ""
echo "🚀 Deploy on Netlify:"
echo "  1. Go to https://netlify.com"
echo "  2. Click 'Add new site' → 'Import an existing project'"
echo "  3. Connect GitHub → select 'frontend-dev-roadmap'"
echo "  4. Build command: npm run build"
echo "  5. Publish dir: dist"
echo "  6. Deploy!"
