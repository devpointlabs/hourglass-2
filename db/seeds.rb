
a = User.create(
  email:'admin@hourglass.com',
  password: 'password'
)
a1 = User.create(
  email:'admin1@hourglass.com',
  password: 'password'
)

admins = [a, a1]
User.create(
  email:'standard@hourglass.com',
  password: 'password'
)
i = 0
3.times do 
	Project.create(
		title: "Project#{i}",
		description: "This is a project test",
		client_name: "Me Foo",
		planned_start: DateTime.now,
		planned_end: nil,
		budget: 1000.00 * rand(12),
		complete: false,
		spent: 500.25 * rand(25),
		cost: 30.18 * rand(100),
		project_admins: [admins.sample.id]
	)
	i+=1
end

puts "Test Projects Seeded!"

