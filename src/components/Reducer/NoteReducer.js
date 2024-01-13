export const NoteReducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT":
      return action.payload;
    case "ADD_NOTE":
      if (state.find((item) => item.noteId === action.payload.noteId)) {
        return state;
      }
      newState = [...state, action.payload];
      break;
    case "CHANGE_NOTE_TITLE": {
      console.log("change_note_title");
      newState = JSON.parse(
        JSON.stringify(
          state.map((item) => {
            if (item.noteId === action.payload.noteId) {
              return {
                ...item,
                noteTitle: action.payload.noteTitle,
              };
            } else {
              return item;
            }
          })
        )
      );
      break;
    }
    case "DELETE_NOTE": {
      newState = state.filter((item) => item.noteId !== action.payload);
      break;
    }
    case "ADD_CONTENTS": {
      newState = JSON.parse(
        JSON.stringify(
          state.map((item) => {
            if (item.noteId === action.currentId) {
              return {
                ...item,
                todoContent: [...item.todoContent, action.payload],
              };
            } else {
              return item;
            }
          })
        )
      );
      break;
    }
    case "DELETE_CONTENTS": {
      newState = JSON.parse(
        JSON.stringify(
          state.map((item) => {
            if (item.noteId === action.currentId) {
              return {
                ...item,
                todoContent: item.todoContent.filter(
                  (it) => it.id !== action.payload
                ),
              };
            } else {
              return item;
            }
          })
        )
      );
      break;
    }
    case "CHANGE_COMPLETE": {
      newState = JSON.parse(
        JSON.stringify(
          state.map((item) => {
            if (item.noteId === action.currentId) {
              return {
                ...item,
                todoContent: item.todoContent.map((it) => {
                  if (it.id === action.payload.id) {
                    return {
                      ...it,
                      isComplete: action.payload.isComplete,
                    };
                  } else {
                    return it;
                  }
                }),
              };
            } else {
              return item;
            }
          })
        )
      );
      break;
    }
    case "CHANGE_FAVIROITES": {
      newState = JSON.parse(
        JSON.stringify(
          state.map((item) => {
            if (item.noteId === action.currentId) {
              return {
                ...item,
                todoContent: item.todoContent.map((it) => {
                  if (it.id === action.payload.id) {
                    return {
                      ...it,
                      isFaviroites: action.payload.isFaviroites,
                    };
                  } else {
                    return it;
                  }
                }),
              };
            } else {
              return item;
            }
          })
        )
      );
      break;
    }
    case "SET_DEADLINE": {
      newState = JSON.parse(
        JSON.stringify(
          state.map((item) => {
            if (item.noteId === action.currentId) {
              return {
                ...item,
                todoContent: item.todoContent.map((it) => {
                  if (it.id === action.payload.id) {
                    return {
                      ...it,
                      deadLine: action.payload.date,
                    };
                  } else {
                    return it;
                  }
                }),
              };
            } else {
              return item;
            }
          })
        )
      );
      break;
    }
    default:
      return state;
  }

  localStorage.setItem("todoNote", JSON.stringify(newState));
  return newState;
};
