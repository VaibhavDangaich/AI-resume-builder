import React from 'react'

function PersonalDetailPreview({resumeInfo}) {
  return (
    <div>
        <h2>{resumeInfo?.firstName} {ressumeInfo?.lastName}</h2>
    </div>
  )
}

export default PersonalDetailPreview