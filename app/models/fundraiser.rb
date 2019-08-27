class Fundraiser < ApplicationRecord
    belongs_to :school
    has_many :users
    has_many :comments
    has_many :reservations

    scope :exceeded_expectations?, -> { where('amt_raised > goal')}
    scope :belongs_to_school?, -> (user) { where(school_id: user.school_id)}

    def completed?
        self.status == "Completed"
    end 

    def fundraiser_info(attribute) 
        if self.send(attribute).nil?
            "None specified"
        else 
           self.send(attribute)
        end
    end 

    def format_date
        if self.date.nil?
            "None specified"
        else
            self.date.strftime("%m/%d/%Y")
        end 
    end 

    def percent_of_goal
            x = self.amt_raised - self.goal 
            y = x / self.goal
            z = y * 100 + 100
            z
    end 
    
end
