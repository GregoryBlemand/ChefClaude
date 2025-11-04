import {useEffect, useRef, useState} from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientsList from "./IngredientsList";
import { getRecipeFromMistral } from "../ai";

export default function Main () {
    const [ingredients, setIngredients] = useState(
        ['all the main spices', 'pasta', 'ground beef', 'tomato paste']
    );
    const [recipe, setRecipe] = useState('');
    const recipeSection = useRef(null);

    useEffect(
        () => {
            if (recipe !== '' && recipeSection.current !== null) {
                recipeSection.current.scrollIntoView({
                    behavior: "smooth"
                });
            }
        }
        , [recipe]
    );

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
                ingredients.length > 0 &&
                <IngredientsList
                    ref={recipeSection}
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