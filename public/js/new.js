const newFormHandler = async function(event) {
  event.preventDefault();

  const title = document.querySelector('#new-title').value;
  const body = document.querySelector('#new-body').value;
  console.log( title, body)
  try{
    console.log('you hit here')
    await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        body,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    document.location.replace('/dashboard');
  }catch(err){
    console.log(err)
  }

};

document
  .querySelector('#new-post-form')
  .addEventListener('submit', newFormHandler);
