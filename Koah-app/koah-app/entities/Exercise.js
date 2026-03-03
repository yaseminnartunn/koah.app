{
  "name": "Exercise",
  "type": "object",
  "properties": {
    "title": {
      "type": "string"
    },
    "category": {
      "type": "string",
      "enum": [
        "nefes",
        "isinma",
        "guclendir",
        "germe"
      ],
      "default": "nefes"
    },
    "duration_minutes": {
      "type": "number"
    },
    "description": {
      "type": "string"
    },
    "instructions": {
      "type": "string"
    },
    "difficulty": {
      "type": "string",
      "enum": [
        "kolay",
        "orta",
        "zor"
      ],
      "default": "kolay"
    },
    "image_url": {
      "type": "string"
    },
    "is_standing": {
      "type": "boolean",
      "default": false
    }
  },
  "required": [
    "title",
    "category"
  ]
}