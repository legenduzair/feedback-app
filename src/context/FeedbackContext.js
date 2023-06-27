import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext()



export const FeedbackProvider = ({children}) => {

    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: 'This is feedback item 1',
            rating: 10
        },
        {
            id: 2,
            text: 'This is feedback item 2',
            rating: 6
        },
        {
            id: 3,
            text: 'This is feedback item 3',
            rating: 8
        }
    ])

    // feedback to be edited
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,
    })

    // add feedback
    const addFeedback = (newFeedback) => {
        // add id to new feedback object 
        newFeedback.id = uuidv4();
        setFeedback([newFeedback, ...feedback]);
    };


    // delete feedback
    const deleteFeedback = (id) => {
        // user confirms delete
        if(window.confirm('Are you sure you want to delete?')){
            setFeedback(feedback.filter((item) => item.id !== id ));
        }        
    }

    // update feedback
    const updateFeedback = (id, newItem) => {
        setFeedback(feedback.map((item) => item.id === id ? {...item, ...newItem} : item))
    }


    // edit feedback - set item to be updated
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true,
        })
    };

    return <FeedbackContext.Provider value={{
        feedback, // feedback state
        deleteFeedback, // delete function
        addFeedback, // add function
        editFeedback, // edit function
        feedbackEdit, // edit state
        updateFeedback, // udpade function        
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext;