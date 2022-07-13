import { Fragment, useEffect, useState } from "react";
import * as userService from "../../services/userService";

import { UserListConstants } from "./UserListConstants";

import { UserDetails } from "./user-details/UserDetails";
import { UserEdit } from "./user-edit/UserEdit";
import { UserRow } from "./UserRow";
import { UserDelete } from "./user-delete/UserDelete";
import { UserCreate } from "./user-create/UserCreate";

export const UserList = () => {
    const [users, setUsers] = useState([]);
    const [userAction, setUserAction] = useState(({ user: null, action: null }));

    useEffect(() => {
        userService.getAll()
            .then(users => setUsers(users));
    }, []);

    const userActionClickHandler = (id, actionType) => {
        userService.getUserById(id)
            .then(user => {
                setUserAction({
                    user,
                    action: actionType
                });
            });
    }

    const closeHandler = () => {
        setUserAction({
            user: null,
            action: null
        });
    }

    const userCreateHandler = (userData) => {

        userService.create(userData)
            .then(user => {
                closeHandler();
                setUsers(state => [...state, user])
            });
    }

    const userEditHandler = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const {
            firstName,
            lastName,
            email,
            imageUrl,
            phoneNumber,
            ...address
        } = Object.fromEntries(formData);

        const userData = {
            firstName,
            lastName,
            email,
            imageUrl,
            phoneNumber,
            address,
        };

        const id = userAction.user._id;

        userService.update(userData, id)
            .then((user) => {
                closeHandler();

                setUsers(state => [...state.filter(user => user._id != id), user])
            });
    }

    return (
        <Fragment>
            <div className="table-wrapper">

                {/*  Overlap components   */}

                {userAction.action == UserListConstants.Details &&
                    <UserDetails
                        user={userAction.user}
                        onClose={closeHandler}
                    />
                }

                {userAction.action == UserListConstants.Edit &&
                    <UserEdit
                        user={userAction.user}
                        onClose={closeHandler}
                        onEdit={userEditHandler}
                    />
                }

                {userAction.action == UserListConstants.Delete &&
                    <UserDelete
                        user={userAction.user}
                        onClose={closeHandler}
                    />
                }

                {userAction.action == UserListConstants.Add &&
                    <UserCreate
                        onClose={closeHandler}
                        onUserCreate={userCreateHandler}
                    />
                }

                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                Image
                            </th>
                            <th>
                                First name<svg aria-hidden="true" focusable="false" data-prefix="fas"
                                    data-icon="arrow-down" className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Last name<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                    className=" icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Email<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                    className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Phone<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                    className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Created
                                <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                    data-icon="arrow-down" className="icon active-icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Table row component */}

                        {users.map((user) => (
                            <tr key={user._id}>
                                <UserRow
                                    user={user}
                                    onClick={userActionClickHandler}
                                />
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
            <button className="btn-add btn" onClick={() => userActionClickHandler(null, UserListConstants.Add)}>Add new user</button>
        </Fragment>
    );
}