class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :admin, :school_id, :household_id
end

