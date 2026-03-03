{
  "name": "UserProgress",
  "type": "object",
  "properties": {
    "exercise_id": {
      "type": "string"
    },
    "exercise_title": {
      "type": "string"
    },
    "completed_date": {
      "type": "string",
      "format": "date"
    },
    "duration_minutes": {
      "type": "number"
    },
    "notes": {
      "type": "string"
    }
  },
  "required": [
    "exercise_id"
  ]
}