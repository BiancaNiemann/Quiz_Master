import React, { useEffect } from "react";

export default function Start(props) {
    //SET STATES
    const [categories, setCategories] = React.useState([])
    const [createList, setCreateList] = React.useState([])

    //FETCHES ALL CATEGORIES FROM OPENTDB AND SETS TO STATE
    React.useEffect(() => {
        fetch('https://opentdb.com/api_category.php')
            .then(res => res.json())
            .then(data => {
                setCreateList(data.trivia_categories)
            })
    },[])

    //CREATES A NEW OBJECT TO PASS TO PARENT COMPONENT WITH THE NAME AND ID SELECTED
    function handleChange(e){
        e.preventDefault()
        const {name, value} = e.target
        setCategories(oldCategory => {
            return {
                ...oldCategory,
                [name]: value
            }
        })
    }
  
    //USES STATE FROM FETCH TO CREATE THE OPTION ELEMENTS BELOW
    const categoryList = createList.map(category => {
            return (
                <option value={category.id} key={category.id}>{category.name}</option> 
            )
        })
    
    //HTML TO RENDER
    return (
        <div className="start-container">
            <h1>Quiz-Master</h1>
            <h3>Test you knowledge</h3>
            <h3>Make your selection to started!</h3>
            <form>
                <label htmlFor="category" className="label">Select your category</label>
                <br/>
                <select
                    id="category"
                    value= {categories.categoryName}
                    onChange={handleChange}
                    name="category"
                >
                    <option value="">All categories</option> 
                    {categoryList}
                </select>
                <br />
                <label htmlFor="difficulty" className="label">Select your difficulty level</label>
                <br/>
                <select
                    id="difficulty"
                    value= {categories.difficulty}
                    onChange={handleChange}
                    name="difficulty"
                >
                    <option value="">All levels</option> 
                    <option value="easy">Easy</option> 
                    <option value="medium">Medium</option> 
                    <option value="hard">Hard</option>     
                </select>
                
            </form>
            <br/>   
            <button onClick={() => props.fetchCategories(categories)}>Click Here to confirm your selection</button>

        </div>
    )
}
