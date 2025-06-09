'use client';

import { useState } from 'react';

interface Recipe {
  id: number;
  title: string;
  ingredients: string;
  instructions: string;
}

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleAddRecipe = () => {
    if (!title || !ingredients || !instructions) return;

    const newRecipe: Recipe = {
      id: Date.now(),
      title,
      ingredients,
      instructions,
    };

    setRecipes([newRecipe, ...recipes]);
    setTitle('');
    setIngredients('');
    setInstructions('');
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🍳 Recipe Manager</h1>

      <div className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Recipe Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleAddRecipe}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Recipe
        </button>
      </div>

      <div className="space-y-4">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{recipe.title}</h2>
            <p className="text-sm text-gray-500 mt-2 whitespace-pre-wrap">
              <strong>Ingredients:</strong> {recipe.ingredients}
            </p>
            <p className="text-sm text-gray-500 mt-2 whitespace-pre-wrap">
              <strong>Instructions:</strong> {recipe.instructions}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
