import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Draft from "../../components/Draft/Draft";
import { UserDraftModel, UserTermModel } from "../../models/user.interface";
import "./Profile.css"

const Profile = () => {

    const [draftList, setDraftList] = useState<UserDraftModel[]>([])
    const [mainDraftId, setMainDraftId] = useState(0)
    const [currentDraftId, setCurrentDraftId] = useState(0)
    const [userId, setUserId] = useState<number>(4)

    const fetchDraftList = async (userId: number) => {
        try {
            const response = await fetch(`/api/profile/drafts?userId=${userId}`);
            const data: UserDraftModel[] = await response.json();
            setDraftList(data);
        } catch (error) {
            console.error("Error fetching drafts:", error);
        }
    };

    useEffect(() => {
        fetchDraftList(userId);
    }, [userId]);

    const setTermList = async (termList: UserTermModel[]) => {
        const draftId = draftList[currentDraftId].id;
        try {
            const response = await fetch(`/api/profile/drafts/${draftId}/terms`, {
                method: 'PUT', // Use PUT method for updating
                headers: {
                    'Content-Type': 'application/json', // Set the content type
                },
                body: JSON.stringify({ termList }), // Send the termList in the body
            });
    
            if (!response.ok) {
                throw new Error('Failed to update term list'); // Handle response errors
            }
    
            const updatedDraft = await response.json(); // Get the updated draft data
            console.log('Updated Draft:', updatedDraft); // Optional: log the updated draft
        } catch (error) {
            console.log('Error updating term list:', error);
        }
    };

    const handleCreateNewDraft = async () => {
        try {
            const response = await fetch(`/api/profile/drafts/create?userId=${userId}`, {
                method: 'PUT',
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            await fetchDraftList(userId);

        } catch (error) {
            console.error("Error fetching drafts:", error);
        }
    }

    const handleDraftDelete = async (draftId: number) => {
        try {
            const response = await fetch(`/api/profile/drafts/delete/${draftId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete draft');
            }

            await fetchDraftList(userId);

        } catch (error) {
            console.error(error);
        }
    }

    return (
       <div className="profile">
            <Navbar />
            <div className="flex flex-row">
                {draftList.map((draft, i) => (
                    <div className="flex flex-row pr-10" key={draft.id}>
                        <p className="pr-3" onClick={() => setCurrentDraftId(i)}>{draft.title}</p>
                        <button onClick={() => handleDraftDelete(draft.id)}>x</button>
                    </div>
                ))}
                <button onClick={handleCreateNewDraft}>+</button>
            </div>
            {draftList.map((draft, i) => {
                if (i === currentDraftId) {
                    return (
                        <div key={draft.id} className="draft-item">
                            <Draft termList={draft.termList} setTermList={setTermList} />
                        </div>
                    );
                }
                return null; // Return null if this draft is not the main draft
            })}
       </div> 
    )
}

export default Profile;
