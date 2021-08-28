import React from 'react'

export default function Cb({creditOwner}) {

    return (
    <>
  <h4 className="rightbarTitle">User Credits</h4>      
  <div class="credit-card">
    <div className="creditnlogo">
    <div className="logo-card">Domot Credit</div>
    <div className="credits">20</div>
     
    </div>
  <div class="numbers">{creditOwner._id}</div>
  <div class="name-and-expiry">
    <span>{creditOwner.username}</span>
    <span><button className="rechargebtn">Recharge</button></span>
  </div>
</div>
  </>
    )
}
