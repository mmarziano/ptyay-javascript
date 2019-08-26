class StudentsController < ApplicationController
    layout "main"

    before_action :my_student?, only: [:edit, :update, :show, :destroy]
    
    def new
        @student = Student.new
        @household = current_user.household
    end 

    def create
        @user = current_user
        if @student = Student.find_by(student_params) 
            flash[:message] = "Student already exists."
            redirect_to user_path(current_user)
        else
            @student = Student.new(student_params)
            @student.household = Household.find(current_user.household_id)
            @student.school = current_user.school
            @classroom = Classroom.find_by(name: params[:student][:grade])
            @student.classroom = @classroom
                if @student.save 
                    render "users/show"
                else 
                    @student.errors.full_messages.inspect
                    render :new
                end  
        end
    end

    def edit 
        @student = Student.find(params[:id])
    end 

    def update 
        @student = Student.find(params[:id])
        if @student.update(student_params)

            redirect_to user_path(current_user)
        else 
            @student.errors.full_messages.inspect
            render :household_path
        end 
    end 

    def destroy
        @student = Student.find(params[:id])
        @student.household.reservations.each do |r| 
            r.attendees.each do |student|
                if student == @student && r.fundraiser.status == "Pending"
                    r.attendees -= [student]
                end 
            if r.attendees.empty?
                r.delete
            else 
              r.save!
            end
          end  
        end
        @student.delete
        redirect_to user_path(current_user)
    end 

    private 

    def student_params 
        params.require(:student).permit(:first_name, :last_name, :grade, :household_id)
    end 

end
