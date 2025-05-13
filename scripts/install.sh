#!/bin/bash
echo "🔧 Installing Ludus dependencies..."
npm install
npm install --save-dev @types/react@~18.2.45
echo "✅ Done. Start Ludus with: npx expo start --web"