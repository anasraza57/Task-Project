import './App.css';
import {useState} from "react";

function App() {
    const [isSelectAll, setIsSelectAll] = useState(false);
    const [permissions, setPermissions] = useState([
        {id: 1, name: 'Ali', checked: false},
        {id: 2, name: 'Anas', checked: false},
        {id: 3, name: 'Shaheer', checked: false},
        {id: 4, name: 'Zain', checked: false},
        {id: 5, name: 'Shayan', checked: false},
        {id: 6, name: 'Amir', checked: false},
        {id: 7, name: 'Waseem', checked: false},
        {id: 8, name: 'Faraz', checked: false},
    ]);

    const [grpPermissions, setGrpPermissions] = useState([
        {id: 1, name: 'Security', checked: false, permissions: [1, 2, 7]},
        {id: 2, name: 'Health', checked: false, permissions: [3, 6]},
        {id: 3, name: 'Admin', checked: false, permissions: [4, 5, 8]},
    ]);

    function onSelectAllHandler(e) {
        setIsSelectAll(e.target.checked);
        selectAllHandler(e.target.checked);
    }

    function selectAllHandler(isSelected) {
        const grpPermissionsCloned = grpPermissions.map(item => (
            {
                ...item,
                checked: isSelected,
            }
        ))
        const permissionsCloned = permissions.map(item => (
            {
                ...item,
                checked: isSelected,
            }
        ))
        setGrpPermissions(grpPermissionsCloned);
        setPermissions(permissionsCloned);
    }

    const findPositions = (first, second) => {
        const indicies = [];
        first.forEach((element, index) => {
            if (second.includes(element.id)) {
                indicies.push(index);
            }
        });
        return indicies;
    };

    function onGrpChangeHandler(e) {
        const grpPermissionsCloned = [...grpPermissions]
        const permissionsCloned = [...permissions]
        const selectedGroup = grpPermissionsCloned.filter(item => item.name === e.target.name);
        if (selectedGroup && selectedGroup.length > 0) {
            selectedGroup[0].checked = e.target.checked;
            const indexes = findPositions(permissionsCloned, selectedGroup[0].permissions);
            indexes.map(index => permissionsCloned[index].checked = e.target.checked)
        }
        setGrpPermissions(grpPermissionsCloned);
        setPermissions(permissionsCloned);
    }

    function onChangeHandler(e) {
        const permissionsCloned = [...permissions]
        const selectedPermission = permissionsCloned.filter(per => per.name === e.target.name);
        if (selectedPermission && selectedPermission.length > 0) {
            selectedPermission[0].checked = e.target.checked;
        }
        setPermissions(permissionsCloned);
    }

    return (
        <div className="App">
            <div className="checkbox">
                <input type="checkbox" name='select_all' checked={isSelectAll} onChange={onSelectAllHandler}/>
                <label htmlFor="select_all"> Select All </label>
            </div>
            <div>
                {grpPermissions.map((item) => (
                    <div className="group-permission" key={item.id}>
                        <div className="checkbox">
                            <input type="checkbox" name={item.name} checked={item.checked}
                                   onChange={onGrpChangeHandler}/>
                            <label htmlFor={item.name} className={"bold"}> {item.name} </label>
                        </div>
                        {permissions.filter(per => item.permissions.includes(per.id)).map((data) => (
                            <div className="permissions" key={data.id}>
                                <div className="checkbox">
                                    <input type="checkbox" name={data.name} checked={data.checked}
                                           onChange={onChangeHandler}/>
                                    <label htmlFor={data.name}> {data.name} </label>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}

            </div>
        </div>
    );
}

export default App;
