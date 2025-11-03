import {useState} from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientsList from "./IngredientsList";
import { getRecipeFromMistral } from "../ai";

export default function Main () {
    const [ingredients, setIngredients] = useState(
        ['all the main spices', 'pasta', 'ground beef', 'tomato paste']
    );
    const [recipe, setRecipe] = useState('');

    const hasIngredients = ingredients.length > 0;

    function addIngredient (formData) {
        const newIngredient = formData.get('ingredient').trim();
        if (newIngredient === '') return;
        setIngredients(
            prevIngredients => [
                ...prevIngredients,
                newIngredient,
            ]);
    }

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromMistral(ingredients);
        setRecipe(recipeMarkdown);
    }

    return (
        <main>
            <form className="add-ingredient-form" action={addIngredient}>
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredients"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {
                hasIngredients &&
                <IngredientsList
                    ingredients={ingredients}
                    toggleRecipe={getRecipe}
                />
            }

            {
                recipe &&
                <ClaudeRecipe
                    content={recipe}
                />
            }

        </main>
    )
};