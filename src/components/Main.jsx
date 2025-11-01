import {useState} from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientsList from "./IngredientsList";

export default function Main () {
    const [ingredients, setIngredients] = useState(
        ['all the main spices', 'pasta', 'ground beef', 'tomato paste']
    );
    const [recipeShown, setRecipeShown] = useState(false);

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

    function toggleRecipe() {
        setRecipeShown(prevIsShown => !prevIsShown);
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
                    toggleRecipe={toggleRecipe}
                />
            }

            {
                recipeShown &&
                <ClaudeRecipe />
            }

        </main>
    )
};