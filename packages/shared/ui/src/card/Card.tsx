import React from 'react';

import './Card.scss';

export default function Card() {
    return (
        <div className="card">
            <div className="card-content">
                <div className="card-header">
                    <div className="energy">
                        1
                    </div>
                    <div className="name">
                        Matador de onça
                    </div>
                </div>
                <div className="card-image">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHqgkE_DuKlLjQCZGLFIn0D8KfyqZv3IcKe2DIYWESezCtJUUQ0Z2Jc_2-qLjdCZv22aM&usqp=CAU" alt="" />
                </div>
                <div className="card-stats">
                    <div>dano</div>
                    <div>escudo</div>
                </div>
                <div className="card-description">
                    descrição
                </div>
                <div className="card-passive">
                    passiva
                </div>
            </div>
        </div>
    );
}