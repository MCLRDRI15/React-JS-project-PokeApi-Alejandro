
export const SET_SHOW = "SET_SHOW";

export const setShow =
  (oldState: boolean) =>
  (
    dispatch: (parameter: { type: string; payload: { oldState: boolean } }) => void
  ) => {
    dispatch({
      type: SET_SHOW,
      payload: {
        oldState,
      },
    });
  };
