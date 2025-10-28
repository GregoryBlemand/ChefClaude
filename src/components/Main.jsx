import {useState} from "react";

export default function Main () {
    const [ingredients, setIngredients] = useState(['Chicken', 'Oregano', 'Tomatoes']);
    const ingredientsListItem = ingredients.map(
        ingredient => <li key={ingredient}>{ingredient}</li>);

    function handleSubmit (e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newIngredient = formData.get('ingredient');
        setIngredients([...ingredients, newIngredient]);
        e.currentTarget.querySelector('[name="ingredient"]').value = '';
    }

    return (
        <main>
            <form className="add-ingredient-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredients"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>
            <ul>
                {ingredientsListItem}
            </ul>
        </main>
    )
};