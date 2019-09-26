class StudentSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :grade
    belongs_to :school
    belongs_to :household
    belongs_to :classroom, optional: true
    has_many :reservations
end
