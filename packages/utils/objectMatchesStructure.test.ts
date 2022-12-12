import { objectMatchesStructure } from './objectMatchesStructure'

const object = {
  this_is: {
    an: 5,
    object: ['abc'],
    with: {
      some: {
        nested: {
          fields: 'yup',
          null_field: null,
        },
      },
    },
    and_a_zero_value: 0,
    and_an_undefined_value: undefined,
  },
  another: false,
}

test('objectMatchesStructure', () => {
  expect(
    objectMatchesStructure(object, {
      this_is: {},
    })
  ).toBe(true)
  expect(
    objectMatchesStructure(object, {
      this_is: {},
      a_missing_field: {},
    })
  ).toBe(false)
  expect(
    objectMatchesStructure(object, {
      this_is: {},
      another: {},
    })
  ).toBe(true)

  expect(
    objectMatchesStructure(object, {
      this_is: {
        an: {},
        object: {},
      },
    })
  ).toBe(true)
  expect(
    objectMatchesStructure(object, {
      this_is: {
        an: {},
        object: {},
        with_a_missing_field: {},
      },
    })
  ).toBe(false)

  expect(
    objectMatchesStructure(object, {
      this_is: {
        an: {},
        object: {},
        with: {
          some: {
            nested: {
              fields: {},
            },
          },
        },
      },
    })
  ).toBe(true)
  expect(
    objectMatchesStructure(object, {
      this_is: {
        an: {},
        object: {},
        with: {
          some: {
            nested: {
              fields: {
                but_actually_too_many: {},
              },
            },
          },
        },
      },
    })
  ).toBe(false)

  expect(
    objectMatchesStructure(
      object,
      {
        this_is: {
          with: {
            some: {
              nested: {
                null_field: {},
              },
            },
          },
        },
      },
      {
        ignoreNullUndefined: false,
      }
    )
  ).toBe(false)
  expect(
    objectMatchesStructure(
      object,
      {
        this_is: {
          and_a_zero_value: {},
        },
      },
      {
        ignoreNullUndefined: false,
      }
    )
  ).toBe(true)
  expect(
    objectMatchesStructure(object, {
      this_is: {
        and_an_undefined_value: {},
      },
    })
  ).toBe(false)
  expect(
    objectMatchesStructure(
      object,
      {
        this_is: {
          and_an_undefined_value: {},
        },
      },
      {
        ignoreNullUndefined: true,
      }
    )
  ).toBe(true)
})
