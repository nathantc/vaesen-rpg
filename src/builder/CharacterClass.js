export function CharacterClass() {
  return (
    <div>
      <label>Name</label>
      <input type="text" />
      <h2>Character Class</h2>
      <div className="table-economic-class">
        <div></div>
        <div>D66</div>
        <div>Class</div>
        <div>Resources</div>

        <div><input type="radio"/></div>
        <div>11-16</div>
        <div>Poor</div>
        <div>1</div>

        <div><input type="radio"/></div>
        <div>21-31</div>
        <div>Worker</div>
        <div>2</div>

        <div><input type="radio"/></div>
        <div>32-56</div>
        <div>Burgher</div>
        <div>3</div>

        <div><input type="radio"/></div>
        <div>61-66</div>
        <div>Aristocrat</div>
        <div>5</div>

      </div>
      <div>
        <button>Next</button>
      </div>
    </div>
  )
}
