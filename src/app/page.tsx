'use client';
import { useEffect, useState } from 'react';

export type Recipe = {
  id: number;
  title: string;
  ingredients: string;
  instructions: string;
};

export default function Home() {
  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Recipe list
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // New recipe form
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  // Edit mode state
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editIngredients, setEditIngredients] = useState('');
  const [editInstructions, setEditInstructions] = useState('');

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('recipes');
    if (stored) {
      setRecipes(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  // Add new recipe
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

  // Delete recipe
  const handleDeleteRecipe = (id: number) => {
    setRecipes(recipes.filter((r) => r.id !== id));
  };

  // Start editing
  const startEditing = (recipe: Recipe) => {
    setEditingId(recipe.id);
    setEditTitle(recipe.title);
    setEditIngredients(recipe.ingredients);
    setEditInstructions(recipe.instructions);
  };

  // Save edited recipe
  const handleSaveEdit = () => {
    if (!editTitle || !editIngredients || !editInstructions || editingId === null) return;

    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === editingId
        ? {
            ...recipe,
            title: editTitle,
            ingredients: editIngredients,
            instructions: editInstructions,
          }
        : recipe
    );

    setRecipes(updatedRecipes);
    cancelEditing();
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setEditTitle('');
    setEditIngredients('');
    setEditInstructions('');
  };

  // Filter recipes based on search
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.ingredients.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🍳 Recipe Manager</h1>

      {/* Add new recipe form */}
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

      {/* Search input */}
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 border rounded mb-6"
      />

      {/* Recipe list */}
      <div className="space-y-4">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="border p-4 rounded shadow relative">
            {editingId === recipe.id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <textarea
                  value={editIngredients}
                  onChange={(e) => setEditIngredients(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <textarea
                  value={editInstructions}
                  onChange={(e) => setEditInstructions(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveEdit}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold">{recipe.title}</h2>
                <p className="text-sm text-gray-600 whitespace-pre-wrap mt-2">
                  <strong>Ingredients:</strong> {recipe.ingredients}
                </p>
                <p className="text-sm text-gray-600 whitespace-pre-wrap mt-2">
                  <strong>Instructions:</strong> {recipe.instructions}
                </p>
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => startEditing(recipe)}
                    className="text-blue-500 hover:text-blue-700 text-sm"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDeleteRecipe(recipe.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    ❌ Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
