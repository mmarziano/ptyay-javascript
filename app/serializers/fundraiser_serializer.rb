class FundraiserSerializer < ActiveModel::Serializer
  attributes :id, :school_id, :title, :description, :amt_raised, :completed, :goal, :price, :time, :duration, :location, :notice, :school_year, :admin_notes, :created_at, :updated_at
  
end
