import React, { useState, useEffect } from "react";
import { Form, Input } from '@rocketseat/unform'

function DevForm({ onSubmit }) {
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setLatitude(latitude)
        setLongitude(longitude)
      },
      (err) => {
        console.log(err)
      },
      {
        timeout: 30000
      }
    )
  }, [])

  async function handleAddDev(data) {
    window.location.reload()
    await onSubmit({...data})
  }
  return (
    <Form onSubmit={handleAddDev}>
      <div className="input-block">
        <Input label="Usuário do GitHub" name="github_username" />
      </div>
      <div className="input-block">
        <Input label="Tecnologias" name="techs" required />
      </div>
      <div className="input-group">
        <div className="input-block">
          <Input
            type="number"
            label="Latitude"
            name="latitude"
            required
            value={latitude}
            onChange={e => setLatitude(e.target.value)}
          />
        </div>
        <div className="input-block">
          <Input
            type="number"
            label="longitude"
            name="longitude"
            required
            value={longitude}
            onChange={e => setLongitude(e.target.value)}
          />
        </div>
      </div>
      <button type="submit">Salvar</button>
    </Form>
  );
}

export default DevForm;
