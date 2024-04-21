import React, { useState } from 'react';

const ScreenComponent = () => {
    const [showScreen, setShowScreen] = useState(false);

    const handleClickOutside = () => {
        // Hide the screen when clicked outside
        setShowScreen(false);
    };

    return (
        <div>
            <button onClick={() => setShowScreen(true)}>Show Screen</button>
            {showScreen && (
                <div className="screen" onClick={handleClickOutside}>
                    {/* Content of the screen */}
                    <div className="screen-content">
                        <h2>This is the screen content</h2>
                        <p>Click outside this box to close the screen.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScreenComponent;
