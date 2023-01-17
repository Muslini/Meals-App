import React, { Fragment } from "react";
import Card from "./UI/Card";
import Summary from "./Summary";
import DUMMY_MEALS from "./Dummy";
import MealItems from "./MealItems";

function Meals() {
  function mapThrough(doc) {
    return (
      <MealItems
        key={doc.id}
        id={doc.id}
        name={doc.name}
        description={doc.description}
        price={doc.price}
      />
    );
  }

  return (
    <Fragment>
      <div className="summary-box">
        <Summary />
      </div>
      <div>
        <Card className="meals-box">{DUMMY_MEALS.map(mapThrough)}</Card>
      </div>
    </Fragment>
  );
}

export default Meals;
