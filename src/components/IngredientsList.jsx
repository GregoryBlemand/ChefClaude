export default function IngredientsList(props) {
    const ingredientsListItem = props.ingredients.map(
        ingredient => <li key={ingredient}>{ingredient}</li>
    );

    return (
        <section>
            <h1>Ingredients on hand:</h1>
            <ul className="ingredients-list">{ingredientsListItem}</ul>
            {
                ingredientsListItem.length > 3 &&
                <div className="get-recipe-container">
                    <div ref={props.ref}>
                        <h3>Ready for a recipe</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button onClick={props.toggleRecipe}>Get a recipe</button>
                </div>
            }
        </section>
    );
}