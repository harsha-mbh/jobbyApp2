import './index.css'

const SkillItem = props => {
  const {skill} = props
  const updatedSkill = {
    name: skill.name,
    imageUrl: skill.image_url,
  }
  const {name, imageUrl} = updatedSkill
  return (
    <li className="skill-item">
      <img src={imageUrl} alt={name} className="skill-image" />
      <p className="skill-name">{name}</p>
    </li>
  )
}

export default SkillItem
