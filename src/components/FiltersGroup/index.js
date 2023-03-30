import './index.css'

const FiltersGroup = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    onChangeMinSalary,
    onChangeEmploymentType,
    minimumpackageQuery,
    employmentTypeQuery,
  } = props

  const onSalaryRangeChange = event => {
    const {id} = event.target
    onChangeMinSalary(id)
  }

  const onEmploymentTypeChange = event => {
    onChangeEmploymentType(event.target)
  }

  return (
    <div className="filter-group-container">
      <div className="employment-type-container">
        <h1 className="filter-heading">Type of Employment</h1>
        <ul className="filters-group-container">
          {employmentTypesList.map(employmentType => (
            <li key={employmentType.employmentTypeId} className="filter-item">
              <input
                type="checkbox"
                id={employmentType.employmentTypeId}
                className="filter-selector"
                checked={employmentTypeQuery.includes(
                  employmentType.employmentTypeId,
                )}
                onChange={onEmploymentTypeChange}
              />
              <label
                htmlFor={employmentType.employmentTypeId}
                className="employment-type"
              >
                {employmentType.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <hr />
      <div className="salary-range-container">
        <h1 className="filter-heading">Salary Range</h1>
        <ul className="filters-group-container">
          {salaryRangesList.map(salaryRange => (
            <li key={salaryRange.salaryRangeId} className="filter-item">
              <input
                type="radio"
                id={salaryRange.salaryRangeId}
                name="salary"
                className="filter-selector"
                checked={minimumpackageQuery === salaryRange.salaryRangeId}
                onChange={onSalaryRangeChange}
              />
              <label
                htmlFor={salaryRange.salaryRangeId}
                className="employment-type"
              >
                {salaryRange.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default FiltersGroup
